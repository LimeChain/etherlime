#include <node.h>
#include <nan.h>

extern "C" {
  #include "blake.h"
}

#define CREATE_BLAKE_WRAPPER(size, out_size) \
class BlakeWrapper##size : public Nan::ObjectWrap { \
 public: \
  static v8::Local<v8::Function> Initialize () { \
    Nan::EscapableHandleScope scope; \
    v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New); \
    tpl->SetClassName(Nan::New("Blake" # size).ToLocalChecked()); \
    tpl->InstanceTemplate()->SetInternalFieldCount(1); \
    Nan::SetPrototypeMethod(tpl, "update", Update); \
    Nan::SetPrototypeMethod(tpl, "digest", Digest); \
    return scope.Escape(Nan::GetFunction(tpl).ToLocalChecked()); \
  } \
 private: \
  state##size state; \
  static NAN_METHOD(New) { \
    BlakeWrapper##size* obj = new BlakeWrapper##size(); \
    blake##size##_init(&obj->state); \
    obj->Wrap(info.This()); \
    info.GetReturnValue().Set(info.This()); \
  } \
  static NAN_METHOD(Update) { \
    BlakeWrapper##size* obj = Nan::ObjectWrap::Unwrap<BlakeWrapper##size>(info.Holder()); \
    v8::Local<v8::Object> buffer = info[0].As<v8::Object>(); \
    const uint8_t* data = (const uint8_t*) node::Buffer::Data(buffer); \
    uint64_t length = (uint64_t) node::Buffer::Length(buffer); \
    blake##size##_update(&obj->state, data, length); \
  } \
  static NAN_METHOD(Digest) { \
    BlakeWrapper##size* obj = Nan::ObjectWrap::Unwrap<BlakeWrapper##size>(info.Holder()); \
    v8::Local<v8::Object> buffer = Nan::NewBuffer(out_size).ToLocalChecked(); \
    uint8_t* data = (uint8_t*) node::Buffer::Data(buffer); \
    blake##size##_final(&obj->state, data); \
    info.GetReturnValue().Set(buffer); \
  } \
};

CREATE_BLAKE_WRAPPER(224, 28);
CREATE_BLAKE_WRAPPER(256, 32);
CREATE_BLAKE_WRAPPER(512, 64);
CREATE_BLAKE_WRAPPER(384, 48);

NAN_MODULE_INIT(Init) {
  Nan::Set(target, Nan::New("Blake224").ToLocalChecked(), BlakeWrapper224::Initialize());
  Nan::Set(target, Nan::New("Blake256").ToLocalChecked(), BlakeWrapper256::Initialize());
  Nan::Set(target, Nan::New("Blake384").ToLocalChecked(), BlakeWrapper384::Initialize());
  Nan::Set(target, Nan::New("Blake512").ToLocalChecked(), BlakeWrapper512::Initialize());
}

NODE_MODULE(blake, Init)

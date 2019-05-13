{
  "targets": [{
    "target_name": "blake",
    "sources": [
      "./src/addon.cc",
      "./src/blake224.c",
      "./src/blake256.c",
      "./src/blake384.c",
      "./src/blake512.c"
    ],
    "include_dirs": [
      "<!(node -e \"require('nan')\")"
    ],
    "cflags": [
      "-Wall",
      "-Wno-maybe-uninitialized",
      "-Wno-uninitialized",
      "-Wno-unused-function",
      "-Wextra"
    ]
  }]
}

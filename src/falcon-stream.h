#ifndef H_FALCON_STREAM
#define H_FALCON_STREAM

#ifdef __cplusplus
extern "C" {
#endif

#include "falcon.h"


#ifdef __cplusplus
}
#endif

#include <napi.h>

#define DEGREE 10

Napi::Value keygen(const Napi::CallbackInfo& info);

Napi::Value startSign(const Napi::CallbackInfo& info);

Napi::Value finalizeSign(const Napi::CallbackInfo& info);

Napi::Value startVerify(const Napi::CallbackInfo& info);

Napi::Value finalizeVerify(const Napi::CallbackInfo& info);

Napi::Object Init(Napi::Env env, Napi::Object exports);

unsigned int PRIVKEY_SIZE = FALCON_PRIVKEY_SIZE(10);

unsigned int PUBKEY_SIZE = FALCON_PUBKEY_SIZE(10);

unsigned int SIG_MAX = FALCON_SIG_COMPRESSED_MAXSIZE(10);



#endif
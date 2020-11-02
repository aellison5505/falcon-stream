#include "falcon-stream.h"
#include <inttypes.h>


Napi::Value keygen(const Napi::CallbackInfo& info) {

    uint8_t tmp[FALCON_TMPSIZE_KEYGEN(10)]; 

    Napi::Env env = info.Env();

    shake256_context * s = (shake256_context*) * info[0].As<Napi::Buffer<uint64_t>>().Data();

    //shake256_context * c = (shake256_context*) * s;

    Napi::Buffer<uint8_t> pk = info[1].As<Napi::Buffer<uint8_t>>();

    Napi::Buffer<uint8_t> sk = info[2].As<Napi::Buffer<uint8_t>>();

    //shake256_init_prng_from_system(&c);

    //size_t tmpL = sizeof(tmp)/sizeof(tmp[0]);

    signed int i = falcon_keygen_make(s, 10, sk.Data() , sk.Length(), pk.Data(), pk.Length(), &tmp, sizeof(tmp));

    //for (int i=0; i<100; i++){
    //sk[i] = p[i];
    //printf("%i ", sk[i]);
    //}
    //printf("\n");

     return Napi::Value::From(env,i);

}

Napi::Value startSign(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  shake256_context * s = (shake256_context *) * info[0].As<Napi::Buffer<uint64_t>>().Data();

  void * n = info[1].As<Napi::Buffer<uint8_t>>().Data();

  shake256_context * m = (shake256_context *)  * info[2].As<Napi::Buffer<uint64_t>>().Data();

  int i = falcon_sign_start(s,n,m);

  return Napi::Number::New(info.Env(), i);

}

Napi::Value finalizeSign(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  uint8_t tmp[FALCON_TMPSIZE_SIGNDYN(10)]; 

  shake256_context * s = (shake256_context *) * info[0].As<Napi::Buffer<uint64_t>>().Data();

  Napi::Buffer<uint8_t> sig = info[1].As<Napi::Buffer<uint8_t>>();

  size_t * sigL;
  sigL = info[2].As<Napi::Buffer<size_t>>().Data();
  *sigL = SIG_MAX;

  Napi::Buffer<uint8_t> sk = info[3].As<Napi::Buffer<uint8_t>>();

  shake256_context * m = (shake256_context *)  * info[4].As<Napi::Buffer<uint64_t>>().Data();

  void * n = info[5].As<Napi::Buffer<uint8_t>>().Data();

  falcon_sign_dyn_finish(s,sig.Data(), sigL, FALCON_SIG_COMPRESSED, sk.Data(), sk.Length(), m, n, &tmp, sizeof(tmp));

  //printf('%ul',  sigL*);


  return Napi::Number::New(info.Env(), 0);


}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "keygen"),
              Napi::Function::New(env, keygen));
  exports.Set(Napi::String::New(env, "startSign"),
              Napi::Function::New(env, startSign));
  exports.Set(Napi::String::New(env, "finalizeSign"),
              Napi::Function::New(env, finalizeSign));
  exports.Set(Napi::String::New(env, "PRIVKEY_SIZE"),
              Napi::Number::New(env, PRIVKEY_SIZE));
  exports.Set(Napi::String::New(env, "PUBKEY_SIZE"),
              Napi::Number::New(env, PUBKEY_SIZE));
  exports.Set(Napi::String::New(env, "SIG_MAX"),
              Napi::Number::New(env, SIG_MAX));
  
  return exports;
}

NODE_API_MODULE(node_falcon_stream, Init);

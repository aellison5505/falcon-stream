#include "falcon-stream.h"


Napi::Value keygen(const Napi::CallbackInfo& info) {

    union {
        uint8_t b[FALCON_TMPSIZE_KEYGEN(10)];
        uint64_t dummy_u64;
        fpr dummy_fpr;
    } tmp;
    //unsigned char *tmp[FALCON_TMPSIZE_KEYGEN(10)];  

    void *pri[FALCON_PRIVKEY_SIZE(10)];
    void *pub[FALCON_PUBKEY_SIZE(10)];

    

    Napi::Env env = info.Env();

    u_int64_t * s = info[0].As<Napi::Buffer<u_int64_t>>().Data();

    shake256_context *c = (shake256_context*) * s;

      Napi::Buffer<uint8_t> pk = info[1].As<Napi::Buffer<uint8_t>>();

     Napi::Buffer<uint8_t> sk = info[2].As<Napi::Buffer<uint8_t>>();

    //shake256_init_prng_from_system(&c);

    signed int i = falcon_keygen_make(c, 10, sk.Data() , FALCON_PRIVKEY_SIZE(10), pk.Data(), FALCON_PUBKEY_SIZE(10), &tmp.b, FALCON_TMPSIZE_KEYGEN(10));
    
     //uint8_t * p = (uint8_t*) pri;
    //sk = (Napi::Buffer<u_int8_t*>) p;

    //for (int i=0; i<100; i++){
    //sk[i] = p[i];
    //printf("%i ", sk[i]);
    //}
    //printf("\n");



     return Napi::Value::From(env,i);

}
/*
Napi::Value adsorb(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  //  Napi::Buffer<shake256incctx> s = info[0].As<Napi::Buffer<shake256incctx>();

    Napi::Buffer<uint8_t> in = info[1].As<Napi::Buffer<uint8_t>>();

  //  shake256_inc_absorb(s.Data(), in.Data(), in.Length());

    return Napi::Number::New(info.Env(), 0);

}

Napi::Value finalize(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  //  Napi::Buffer<shake256incctx> s = info[0].As<Napi::Buffer<shake256incctx>>();

//    shake256_inc_finalize(s.Data());

    return Napi::Number::New(info.Env(), 0);

}

Napi::Value squeeze(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  //  Napi::Buffer<shake256incctx> s = info[1].As<Napi::Buffer<shake256incctx>>();

    Napi::Buffer<uint8_t> out = info[0].As<Napi::Buffer<uint8_t>>();

 //   shake256_inc_squeeze(out.Data(), out.Length(), s.Data());

    return Napi::Number::New(info.Env(), 0);

}

Napi::Value releaseState(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

  //  Napi::Buffer<shake256incctx> s = info[0].As<Napi::Buffer<shake256incctx>>();

//    shake256_inc_ctx_release(s.Data());

    return Napi::Number::New(info.Env(), 0);

}

Napi::Value syncShake256(const Napi::CallbackInfo& info) {

  Napi::Env env = info.Env();

    
    Napi::Buffer<uint8_t> out = info[0].As<Napi::Buffer<uint8_t>>();

    
    Napi::Buffer<uint8_t> in = info[1].As<Napi::Buffer<uint8_t>>();

  //  shake256(out.Data(), out.Length(), in.Data(), in.Length());

    return Napi::Number::New(info.Env(), 0);

}

*/
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "keygen"),
              Napi::Function::New(env, keygen));
  exports.Set(Napi::String::New(env, "PRIVKEY_SIZE"),
              Napi::Number::New(env, PRIVKEY_SIZE));
  exports.Set(Napi::String::New(env, "PUBKEY_SIZE"),
              Napi::Number::New(env, PUBKEY_SIZE));
  exports.Set(Napi::String::New(env, "SIG_MAX"),
              Napi::Number::New(env, SIG_MAX));
  
              /*
  exports.Set(Napi::String::New(env, "adsorb"),
              Napi::Function::New(env, adsorb));
  exports.Set(Napi::String::New(env, "finalize"),
              Napi::Function::New(env, finalize));
  exports.Set(Napi::String::New(env, "squeeze"),
              Napi::Function::New(env, squeeze));
  exports.Set(Napi::String::New(env, "releaseState"),
              Napi::Function::New(env, releaseState));
  exports.Set(Napi::String::New(env, "syncShake256"),
              Napi::Function::New(env, syncShake256));
              */
  return exports;
}

NODE_API_MODULE(node_falcon_stream, Init);

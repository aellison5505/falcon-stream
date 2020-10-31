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

typedef uint64_t fpr;

unsigned int PRIVKEY_SIZE = FALCON_PRIVKEY_SIZE(10);

unsigned int PUBKEY_SIZE = FALCON_PUBKEY_SIZE(10);

unsigned int SIG_MAX = FALCON_SIG_COMPRESSED_MAXSIZE(10);

#endif
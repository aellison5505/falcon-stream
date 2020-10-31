
set(CMAKE_POSITION_INDEPENDENT_CODE true)
set (CMAKE_C_STANDARD 11)

IF(WIN32)
    add_definitions(/nologo /O2 /W4 /wd4146 /WX)
ELSE()
    add_definitions(-O3  -Wall -Wextra -Wshadow -Wundef)
ENDIF()

project (falcon C)

file(GLOB SOURCE_FILES  "*.h" "*.c")

add_library(falcon OBJECT ${SOURCE_FILES})




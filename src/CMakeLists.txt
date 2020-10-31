
set(CMAKE_POSITION_INDEPENDENT_CODE true)

file(GLOB SOURCE_FILES "*.cc" "*.h")

include_directories(${CMAKE_JS_INC})

set(OBJ_NAME falcon-addon)

add_library(${OBJ_NAME} OBJECT ${SOURCE_FILES} ${CMAKE_JS_SRC})

set_property(TARGET ${OBJ_NAME} PROPERTY CXX_STANDARD 11)

execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${OBJ_NAME} PRIVATE ${NODE_ADDON_API_DIR})

#!/bin/sh

file_path="./src/client/$1.js"

if [ -f $file_path ]; then
    file=$(basename "$file_path")
    extension="${file##*.}"
    filename="${file%.*}"

    watchify $file_path -o "uglifyjs -cm > ./assets/script/modules/$filename.min.$extension" &
    sleep 20

    PIDS=`ps -ef|grep watchify|grep -v grep|awk '{print $2}'`
    for pid in $PIDS
    do
        kill -9 $pid
    done
else
    echo 'is no`t file'
    echo $file_path
fi



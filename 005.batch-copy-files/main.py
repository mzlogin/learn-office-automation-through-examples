import shutil
import os

if __name__ == '__main__':

    srcName = 'source.mp4'

    dstDir = 'dst'
    if os.path.exists(dstDir):
        shutil.rmtree(dstDir)
    os.mkdir(dstDir)

    input_filename = 'data.txt'
    f = open(input_filename, 'r')

    for line in f.readlines():
        dstName = line.strip()
        # 复制 srcName 文件为 dst/dstName
        shutil.copy(srcName, dstDir + os.sep + dstName)

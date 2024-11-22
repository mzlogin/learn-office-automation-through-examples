import qrcode

if __name__ == '__main__':
    input_filename = 'data.txt'
    f = open(input_filename, 'r')
    for line in f.readlines():
        print(line)
        params = line.split(',')
        fileName = params[0].strip()
        for i,j in ("/／","\\＼","?？","|︱","\"＂","*＊","<＜",">＞"):
            fileName = fileName.replace(i,j)
        qrcode.make(params[1].strip()).save('%s.png' % fileName)

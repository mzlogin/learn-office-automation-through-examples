import qrcode

if __name__ == '__main__':
    input_filename = 'data.txt'
    f = open(input_filename, 'r')
    for line in f.readlines():
        print(line)
        params = line.split(',')
        qrcode.make(params[1]).save('%s.png' % params[0])

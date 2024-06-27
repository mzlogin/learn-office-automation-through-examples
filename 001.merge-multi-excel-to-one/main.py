import openpyxl
import os
import traceback

def process(src_folder, dst_file):
    dst_workbook = openpyxl.Workbook()
    dst_sheet = dst_workbook.active

    # 设置目标表格表头，可选
    dst_sheet.append(['列1', '列2', '列3'])

    # 源表格表头占几行
    header_rows = 1

    total_rows = 0
    
    for dir_path, dir_names, file_names in os.walk(src_folder):
        for file_name in file_names:
            if file_name.endswith('.xlsx'):
                print('Processing file: %s' % file_name)
                src_file = os.path.join(dir_path, file_name)
                src_workbook = openpyxl.load_workbook(filename=src_file, read_only=True)
                src_sheet = src_workbook.active
                src_row_num = 0
                for row in src_sheet.rows:
                    src_row_num += 1
                    # 跳过表头
                    if header_rows >= src_row_num:
                        continue

                    dst_sheet.append(process_row(row))
                    total_rows += 1
                print('Rows in this file: %d' % (src_row_num - header_rows))
                src_workbook.close()
    
    dst_workbook.save(dst_file)
    dst_workbook.close()
    print('Total rows: %d' % total_rows)

# 对源数据行做一些处理，然后返回结果数据元组
def process_row(row):

    # 直接返回原始数据
    return [cell.value for cell in row]

    # or 

    # 对数据做一些处理和变换后再返回

if __name__ == '__main__':
    current_path = os.path.split(os.path.realpath(__file__))[0]
    src_folder = current_path + os.sep + 'src'
    dst_file = current_path + os.sep + 'result.xlsx'
    try:
        process(src_folder, dst_file)
    except Exception as e:
        print(traceback.format_exc())
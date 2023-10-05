# doAnTKLL
Phát triển ứng dụng đo nhịp tim và oxy máu đơn giản

**I. Tổng quan**
  - Ở đề tài này, nhóm em sẽ sử dụng Max30102 để đo nhịp tim và oxy máu và làm website và app mà trên đó hiển thị ra những thông tin như: Nhịp tim - oxy máu trong 1 khoảng thời gian nhất định
    
  **Sơ đồ khối**


**II. Thực hiện**

  **1. Website và database**
  
    _a) Database_
    - Sử dụng https://000webhost.com/ để tạo 1 host và domain.    
    - Tạo bảng và lưu trữ các biến: 
      + id: đây là khóa chính, đặt chế độ tự động tăng, kiểu số unsign int, độ dài 6
      
      + sensor: tên loại cảm biến, sẽ hiển thị theo tên cảm biến gửi lên từ ESP8266/ESP32
      
      + location: vị trí đặt cảm biến, hiển thị theo giá trị gửi lên từ ESP
      
      + value1, 2: giá trị cảm biến esp gửi lên
      
      + time_act: timestamp nhận dc giá trị cảm biến

    _b) Website
    - Dùng PHP để làm phần backend
    - Lấy dữ liệu từ database và up dữ liệu lên web
  
  **2. App**
    - Dùng Mit App Inventor để làm app trên điện thoại

**III. Log**
- Tuần 1	Chọn đề tài 13: Phát triển ứng dụng đo nhịp tim và oxy máu đơn giản
- Tuần 2  Tìm hiểu về MAX30102, chạy thử
- Tuần 3	Test lại tại sao cảm biến không chạy đúng ý
- Tuần 4	
- Tuần 5	Tìm hiểu cách tạo web và app
- Tuần 6	Code web, app
- Tuần 7	
- Tuần 8	Chạy thử, sửa
- Tuần 9	
- Tuần 10	
- Tuần 11	
- Tuần 12	
- Tuần 13	viết báo cáo, powerpoint
- Tuần 14	


**Report tuần 3**
- fix xong lỗi phần cứng
- hoàn thành code sensor MAX 30102 để có thể thực hiện đo nhịp tim
**Kế hoạch tuần 4**
- Bắt đầu tìm hiểu về web, server
- Tìm hiểu về html, css, php, mySQL
- Tìm hiểu cách local host một server để đưa thông tin từ arduino.
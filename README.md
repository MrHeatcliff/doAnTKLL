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
  
  **3. App**
    - Dùng Mit App Inventor để làm app trên điện thoại

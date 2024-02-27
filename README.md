#  Quiz Game like Kahoot
Dự án này là một trò chơi đố vui lấy cảm hứng từ Kahoot, nơi người dùng có thể tạo phòng, tham gia phòng và tham gia các câu đố bằng cách trả lời các câu hỏi. Dự án sử dụng CSS Tailwind để tạo kiểu, Django cho phần phụ trợ và máy chủ WebSocket trong C# để liên lạc theo thời gian thực. MongoDB được sử dụng làm cơ sở dữ liệu để lưu trữ câu hỏi, phòng và dữ liệu người dùng.

## Đặc trưng
Tạo câu hỏi: Người host có thể tạo câu hỏi
Tạo phòng: Người dùng có thể tạo phòng đố vui mới.
Phòng tham gia: Người tham gia có thể tham gia các phòng đố vui hiện có bằng cách nhập mã phòng do người tổ chức cung cấp.
Câu đố trong thời gian thực: Sử dụng công nghệ WebSocket, các câu hỏi đố vui được gửi đến người tham gia trong thời gian thực, mang lại trải nghiệm tương tác.
Tính điểm: Người tham gia kiếm được điểm dựa trên câu trả lời đúng và tốc độ phản hồi của họ, thúc đẩy tính cạnh tranh và sự tương tác.
Bảng xếp hạng: Bảng xếp hạng hiển thị điểm số của tất cả người tham gia trong thời gian thực, nâng cao khía cạnh cạnh tranh của trò chơi.
Thiết kế đáp ứng: Giao diện người dùng được thiết kế với Tailwind CSS để đảm bảo khả năng tương thích trên nhiều thiết bị và kích thước màn hình khác nhau.
## Công nghệ được sử dụng
Tailwind CSS: Khung CSS tiện ích đầu tiên được sử dụng để tạo kiểu cho các thành phần giao diện người dùng.
Django: Khung web Python cấp cao được sử dụng để xây dựng máy chủ phụ trợ và quản lý các tuyến đường, chế độ xem và tương tác cơ sở dữ liệu.
WebSocket (C#): Máy chủ WebSocket được triển khai trong C# để xử lý giao tiếp thời gian thực giữa máy chủ và máy khách.
MongoDB: Cơ sở dữ liệu NoSQL được sử dụng để lưu trữ các câu hỏi trắc nghiệm, dữ liệu phòng và thông tin người dùng.

## Installation
Clone the Repository:

git clone https://github.com/ltkiet194/quiz-game-like-kahoot.git

## Navigate to Project Directory:
cd quiz-game
## Install Dependencies:

pip install -r requirements.txt

## Set Up MongoDB:

Install MongoDB and ensure it's running.
Configure MongoDB connection settings in Django's settings.py file.
## Run the Application:
python manage.py runserver

## Run Tailwind
python manage.py tailwind start

## Clone And Run WebSocket Server:
git clone update later .....

Compile and run the WebSocket server written in C#.


## Access the Web Interface:

In progress .....

### Acknowledgements
Tailwind CSS
Django
WebSocket Protocol
MongoDB
Feel free to reach out to the project maintainers for any questions or feedback!








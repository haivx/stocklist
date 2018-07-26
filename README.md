This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## STOCKLIST - Bảng giá chứng khoán
## Yêu cầu bài toán: 
Số	liệu	về	giá	và	thông	tin	chứng	khoán	là	hoàn	toàn	giả	lâp
•  Giá:	được	thiết	lập	ngẫu	nhiên	trong	khoản	từ	[0.01-99.99],	giá	chỉ	có	tối	đa	2	số
thập	phân

•  Giá	tự	động	thay đổi	mỗi	5s và biên	độ	giao	động	không	quá	+/-5%	so	với	giá	
hiện	tại

•  Lần	đầu	tiên	bật	trang	web	lên	sẽ	ghi	nhận	giá	đầu	tiên	là	giá	tham	chiếu	để	tính	
toán	cột	giá	thay	đổi

•  Khối	lượng	được	thiết	lập	ngẫu	nhiên	từ	[1000-1000.000], số nguyên.

•  Khối	lượng	tự	động	thay	đổi	cùng	chu	kỳ	với	giá,chỉ	tăng	không	giảm,	trong	
khoảng	[10,30].

•  Tổng	giá	trị	=	giá	*	khối	lượng.	Kết	quả	được	làm	tròn	về	nguyên.

•  Tên	cty	và	mã	cty	hoàn	toàn	giả	lập	tùy	thích

•  Có	chỉ	báo	màu	cho	phần	“Thay	đổi”:
  •  Nếu	tăng	hơn	thì	trước	đó	thì	để		màu	xanh
  •  Nếu	nhỏ	hơn	thì	để		màu	đỏ

• Top	Gainers	là	1	tab	trả	về	danh	sách	20	mã	có	giá	trị	giao	dịch	lượng	lớn	nhất	từ	danh	
sách	gốc.	Và	ngược	lại	Top	Losers	trả	về	20	mã	có	giá	trị	giao	dịch	thấp	nhất	từ	danh	
sách	gốc	kể	từ	lúc	chạy.	Dữ	liệu	được	sort	trên	trường	Value	(giá	trị	giao	dịch),	ở	tab	
Gainers	là	giảm	dần	và	Losers	là	tăng	dần  
## Hướng dẫn xem Demo
- Chạy command `npm i`
- Chạy command `npm start`
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## STOCKLIST - Bảng giá chứng khoán
## Yêu cầu bài toán: 
Số liệu về giá	và thông tin chứng khoán	là hoàn toàn giả	lập:

•  Giá:	được thiết lập	ngẫu nhiên trong	khoản	từ	[0.01-99.99],	giá	chỉ	có	tối	đa	2	số
thập	phân

•  Giá tự động thay đổi	mỗi	5s và biên	độ	giao	động	không	quá	+/-5%	so	với	giá	
hiện tại

•  Lần đầu	tiên bật trang	web	lên	sẽ	ghi	nhận	giá	đầu	tiên	là	giá	tham	chiếu	để	tính	
toán	cột	giá	thay	đổi

•  Khối	lượng	được thiết lập ngẫu nhiên từ	[1000-1000.000], số nguyên.

•  Khối	lượng	tự động	thay đổi cùng	chu	kỳ với giá,chỉ tăng	không	giảm,	trong	
khoảng	[10,30].

•  Tổng	giá	trị	=	giá	*	khối lượng. Kết quả được làm tròn về nguyên.

•  Tên	cty	và	mã	cty	hoàn toàn	giả	lập	tùy	thích

•  Có	chỉ	báo	màu	cho	phần “Thay	đổi”:
  •  Nếu tăng	hơn	thì	trước	đó thì	để màu xanh
  •  Nếu nhỏ hơn thì để màu đỏ

• Top	Gainers	là	1	tab	trả	về	danh sách	20	mã	có	giá	trị	giao dịch lượng	lớn	nhất từ	danh	
sách	gốc.	Và	ngược	lại	Top	Losers trả	về	20	mã	có	giá	trị	giao	dịch	thấp	nhất từ	danh	
sách	gốc	kể từ	lúc	chạy.	Dữ liệu được sort	trên trường	Value	(giá trị giao	dịch), ở tab	
Gainers	là	giảm dần	và Losers là tăng	dần  
## Hướng dẫn xem Demo
- Chạy command `npm i` để build node modules
- Chạy command `npm start`

## Mô tả:
1. **Tạo một mảng chứa list bảng mã chứng khoán**
2. **Xử lý data theo yêu cầu bài toán**:
- Data mockup sẽ được lưu vào mảng `companies` được khởi tạo trong constructor: 
```js
  [...Array(30)].map((x, i) =>
    companies.push(
      {
        id: i + 1,
        price: parseFloat((Math.random() * (99.99 - 0.01) + 0.01).toFixed(2)),
        originPrice: parseFloat((Math.random() * (99.99 - 0.01) + 0.01).toFixed(2)),
        volume: _.random(1000, 1000000),
        name: (Math.random().toString(36).substring(7)).toUpperCase(),
        company: (chance.company()).toUpperCase(),
      }
    )
  );
```

Sau đó tính tổng khối lượng của mã chứng khoán đó:
```js
  companies.map(item => {
    item['totalValue'] = parseInt(Math.round(item.price * item.volume).toLocaleString('en'));
  })
```
- Data change: Dùng hàm `setInterval` trong `componentDidMount`, chú ý có clear hàm này ở `componentWillUnmount`:
  
```js
    this.interval = setInterval(() => {
      this.state.companies.map(d => {
        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { price: ((Math.random() * (el.price * 1.05 - el.price * 0.95) + el.price * 0.95).toFixed(2)) }),
          )
        });

        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { volume: el.volume + amplitude }),
          )
        });

        this.setState({
          companies: this.state.companies.map(
            (el) => Object.assign({}, el, { totalValue: Math.round(el.volume * el.price) }),
          )
        });
      })

    }, 2000);
```
- Data sort: Check điều kiện cho tab và dùng `lodash` để sort mảng `companies` của các object trong state theo trường `totalValue`:
```js
  let sortedValue;
  if(sort === 'asc') {
    sortedValue = _.orderBy(this.state.companies, ['totalValue'], ['asc'])
  } else {
    sortedValue = _.orderBy(this.state.companies, ['totalValue'], ['desc'])
  }
```
- Change màu cho 2 cột `change` và `%change`: Dùng style inline check điều kiện giá trị để style:
```js
  style={{ color: change > 0 ? "green" : "red" }}
```
- Tạo random string / value, phần tên công ty có dùng lib `chance` để tạo tên cty ngẫu nhiên:
```js
  import Chance from 'chance';

  const chance = new Chance();
  const company: (chance.company()).toUpperCase(),
```
 Thanks!
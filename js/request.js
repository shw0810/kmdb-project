/* ====== Common GET Request Function ====== */
//있는 데이터를 확인하고 가져오는 것 데이터가 변경 되진 않음. 추상적인 함 수 - 추상적이지 않은 하나하나의 데이터를 써야함(url)
async function getRequest(url) {
  return await fetch(url) //await 불러오는 것 / fatch 결과 데이터를 받아오는것
    .then((response) => {
      if (!response.ok) {
        //!는 문제가 있는것
        throw new Error('Network response was not ok'); //실패
      }
      return response.json(); //성공
    });
}

async function getProducts() {
  //async는 비동기 함수에 넣는것임
  const url = `https://yts.mx/api/v2/list_movies.json?limit=5&order_by=desc`;

  try {
    //데이터 요청 및 응답 시도 : 성공일 경우 첫번째 코드 블럭 으로 이동

    const data = await getRequest(url);
    const movieWrapper = document.querySelector('.imgs');
    console.log(data.data.movies);

    const movies = data.data.movies;

    movies.forEach((movie) => {
      const imgEl = `<img src=${movie.medium_cover_image}>`;
      movieWrapper.insertAdjacentHTML('beforeend', imgEl);
    });
  } catch (error) {
    // 실패할 경우 두번째 코드블럭으로 이동
    console.log('Error: ', error);
  }
}

// http : 프로토콜 , ?:키,값 쿼리
// String (desc:최근, asc:옛날 클릭한게 보임)

getProducts();

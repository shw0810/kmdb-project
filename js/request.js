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

async function getProducts(page) {
  //async는 비동기 함수에 넣는것임
  const url = `https://yts.mx/api/v2/list_movies.json?limit=5&order_by=desc&genre=Animation&page=${page}`;

  try {
    //데이터 요청 및 응답 시도 : 성공일 경우 첫번째 코드 블럭 으로 이동

    const data = await getRequest(url);
    const randomData = Math.floor(Math.random() * 5); //0보다 크고 1보다 작은 난수
    //Math.floor : 소수점 이하를 버림
    console.log(data.data.movies[randomData]);

    const movieWrapper = document.querySelector('.recent-img');
    const mainMovie = data.data.movies[randomData];
    const imgEl = `<img src=${mainMovie.large_cover_image}>`;
    movieWrapper.insertAdjacentHTML('beforeend', imgEl);
  } catch (error) {
    // 실패할 경우 두번째 코드블럭으로 이동
    console.log(error);
  }
}

// http : 프로토콜 , ?:키,값 쿼리
// String (desc:최근나온게 보임, asc:옛날 클릭한게 보임)
//https://www.dabipyeung.com/movie_link/

getProducts(1);

// const numbers = document.querySelectorAll('.numbers span');
// numbers.forEach((number) => {
//   number.addEventListener('click', function () {
//     getProducts(this.textContent);
//   });
// });

// alert('1');

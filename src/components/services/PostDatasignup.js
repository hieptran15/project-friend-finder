export function PostDatasignup(userData) {
  // console.log(userData)
    let BaseURL = 'http://13.229.243.41/api/v1/user/register';
    return new Promise((resolve, reject) =>{
        fetch(BaseURL, {
            method: 'POST',
            headers: new Headers({
              'Content-Type' : "application/json"
            }),
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
}
export function PostData(userData) {
    let BaseURL = 'https://aht-social.herokuapp.com/api/v1/user/login';
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
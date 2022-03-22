import React from 'react'

export const GetCountries = (url:string) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json())
          .then((data) => resolve(data))
          .catch((error) => reject(error.response ? error.response.status : 503));
      });
}
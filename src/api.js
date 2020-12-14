export const post = (params) =>  new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            status: 200,
            data: params
        });
    }, 2000);
})
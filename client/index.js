import './styles/style.css'


console.log("🎉 Client Server Working powered by webpack");

let show = (msg="No message given") => {
    console.log(msg)
}

function resolveAfter25Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000)
    });
}

async function asyncCall() {
    console.log("Calling");
    const result = await resolveAfter25Seconds();
    console.log(result);
}

asyncCall();

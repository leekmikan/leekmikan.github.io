function money_jp(){
    const jt = Math.round(515.18333 * 1200);
    let first_j = new Date(2023, 12, 31);
    let final_j = new Date(2024, 9, 1);
    //+30しないとずれる.
    let val = jt + jt * (final_j - first_j) / 86400000 * 0.03 / 365 + jt * ((new Date() - final_j) / 86400000 + 30) * 0.146 / 365;
    document.getElementById("price").innerText = Math.floor(val).toLocaleString();;
}
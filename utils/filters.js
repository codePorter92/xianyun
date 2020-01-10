export const formatDate=(date,spe)=>{
    console.log(date,123)
    spe=spe||"-"
    return date.getFullYear()+spe+(date.getMonth()+1)+spe+date.getDate()
}
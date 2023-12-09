export const currency = (money = 0) => {
    return new Intl.NumberFormat().format(money)
}
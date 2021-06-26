//partial credit github.com/rpxs

export default function random(Length: number) {
    let final: string = "";
    const randomChar = () => {
        let num = Math.floor(Math.random() * 62);
        if (num < 10) return num; //1-10
        if (num < 36) return String.fromCharCode(num + 55); //A-Z
        return String.fromCharCode(num + 61); //a-z
    }

    while(final.length < Length) final += randomChar();

    return final;
}
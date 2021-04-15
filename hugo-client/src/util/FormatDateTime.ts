export default function formatDateTime(d: Date): string {
    let string = "";
    if (d.getDate() === new Date().getDate()) {
        string += "Today";
    } else if (d.getDate() === new Date().getDate() - 1) {
        string += "Yesterday"
    } else {
        string += d.toLocaleDateString();
    }
    string += " " + formatZero(d.getHours()) + ":" + formatZero(d.getMinutes());
    return string;
}

function formatZero(n: number): string {
    return `${(n < 10 ? "0" : "") + n}`;
}
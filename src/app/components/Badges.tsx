import Badge from "./Badge";

export default function Badges() {
    return <div className="badges flex gap-2 flex-wrap">
        <Badge text="คุณภาพดีมาก" status='very'></Badge>
        <Badge text="คุณภาพดี" status='good'></Badge>
        <Badge text="คุณภาพปานกลาง" status='medium'></Badge>
        <Badge text="เริ่มมีผลกระทบ" status='effect'></Badge>
        <Badge text="มีผลกระทบ" status='effected'></Badge>
    </div>
}
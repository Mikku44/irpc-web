import { Avatar, Card as AntCard } from 'antd';
import Meta from 'antd/es/card/Meta';

export default function Card() {
    return <>
        <AntCard
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
         
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="Card title"
                description="This is the description"
            />
        </AntCard>
    </>
}
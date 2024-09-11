import './Members.css';

export function Members() {


    return (
        <div className="members-container">
            <div className='members'>
                <div className='member'>
                    <div className='member-title'>Schmiedt Attila</div>
                    <div className='member-role'>Gitár, Ének</div>
                    <div className='member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/schmiedt_attila_red_pumpkin_pic.webp'})`}}></div>
                </div>
                <div className='member'>
                    <div className='member-title'>Gyenes-Jónás Levente</div>
                    <div className='member-role'>Gitár, Ének</div>
                    <div className='member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/gyenes_jonas_levente_red_pumpkin_pic.webp'})`}}></div>
                </div>
                <div className='other-member'>
                    <div className='member-title'>Keressük...</div>
                    <div className='member-role'>Basszusgitár</div>
                    <div className='other-member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/keressuk_red_pumpkin_pic.webp'})`}}></div>
                </div>
                
                
            </div>
            <div className='other-members'>
                <div className='other-member'>
                    <div className='member-title'>Zurkó Liliána</div>
                    <div className='member-role'>Ének</div>
                    <div className='other-member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/zurko_liliana_red_pumpkin_pic.webp'})`}}></div>
                </div>
                <div className='other-member'>
                    <div className='member-title'>Keressük...</div>
                    <div className='member-role'>Ének</div>
                    <div className='other-member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/keressuk_red_pumpkin_pic.webp'})`}}></div>
                </div>
                <div className='other-member'>
                    <div className='member-title'>Keressük...</div>
                    <div className='member-role'>Dob</div>
                    <div className='other-member-image' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/keressuk_red_pumpkin_pic.webp'})`}}></div>
                </div>
            </div>
        </div>
    );
}
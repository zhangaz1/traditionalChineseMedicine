const swiperNav = {
    slidesPerView: 6,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
};
const navData = [
    {
        'name': '古籍',
        component: 'books'
    },
    {
        'name': '医案',
        component: 'doctorBook'
    },
    // {
    //     'name': '视频',
    //     component: 'prescriptions'
    // },
    // {
    //     'name': '问病',
    //     component: 'askDisease'
    // },
    // {
    //     'name': '百科',
    //     component: 'wikipedia'
    // },
    {
        'name': '视频',
        component: 'videoList'
    }
];
export {
    swiperNav,
    navData
};

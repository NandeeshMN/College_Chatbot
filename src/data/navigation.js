export const navigationLinks = [
    { label: 'Home', path: '/' },
    {
        label: 'About Us',
        path: '/about',
        dropdown: [
            { label: 'Why Choose Us', path: '/#why-cbs' },
            {
                label: 'Faculty',
                path: '/about/faculty',
                dropdown: [
                    { label: 'Teaching Staff', path: '/about/faculty/teaching' },
                    { label: 'Non-Teaching Staff', path: '/about/faculty/non-teaching' }
                ]
            },
        ],
    },
    {
        label: 'Programs',
        path: '/programs',
        dropdown: [
            { label: 'MBA', path: '/programs/mba' },
            { label: 'MCA', path: '/programs/mca' },
        ],
    },
    {
        label: 'Activities',
        path: '/activities',
        dropdown: [
            { label: 'Photo Gallery', path: '/activities/photo-gallery' },
            { label: 'Video Gallery', path: '/activities/videos' },
        ],
    },
    {
        label: 'CBS',
        path: '/cbs',
        dropdown: [
            { label: 'Grievance', path: '/cbs/grievance' },
            { label: 'Mandatory Disclosure', path: '/cbs/mandatory-disclosure' },
            { label: 'Payments', path: '/cbs/payments' },
            { label: 'Scholarship Details', path: '/cbs/scholarship' },
            { label: 'Anuragha', path: '/cbs/anuragha' },
            { label: 'Sankalp', path: '/cbs/sankalp' },
            { label: 'Chaitanya', path: '/cbs/chaitanya' },
        ],
    },
    {
        label: 'Placements',
        path: '/placements',
        dropdown: [
            { label: 'Placement Process', path: '/placements/process' },
            { label: 'Recruiters', path: '/placements/recruiters' },
            { label: 'Brochure 2024', path: '/placements/brochure-2024' },
        ],
    },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
];

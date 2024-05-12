// pages/index.tsx
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col items-center justify-center text-center animate-fade-to-left ">
            <div className="bg-green-100 p-1 rounded-full">
                <img src={imageUrl} alt="feature icon" className="w-20 h-20 mb-3"/>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

const features = [
    {
        "title": "Management of Reservation Deposits and Rental Contracts",
        "description": "Keep all information on tenants, deposit amounts, deposit dates, etc. With this feature, you will not need to remember any deposit information.",
        "imageUrl": "/feature_home_images/feature-deposit-management.png"
    },
    {
        "title": "Vehicle and Asset Management",
        "description": "Manage information about tenant vehicles & assets used during the rental period, inventory the condition of the assets.",
        "imageUrl": "/feature_home_images/feature-deposit-management.png"
    },
    {
        "title": "Room Billing and Payment Collection",
        "description": "We help you track and calculate costs for electricity, water, services, etc., automatically finalize monthly room payments, and print invoices for tenants. Track monthly room payment collections for you.",
        "imageUrl": "/feature_home_images/feature-billing-management.png"
    },
    {
        "title": "Advertising for Finding Tenants",
        "description": "LOZIDO supports posting ads on platforms such as: boarding house and rental property websites, social media platforms. Additionally, we have a professional team to help you quickly fill vacancies.",
        "imageUrl": "/feature_home_images/feature-advertisement.png"
    },
    {
        "title": "Financial Management",
        "description": "All income and expenses related to business operations will be stored and automatically calculated so you won’t have to struggle with the numbers.",
        "imageUrl": "/feature_home_images/feature-financial-management.png"
    },
    {
        "title": "Tenant Management",
        "description": "Manage information about tenants, the status of their identification documents, and temporary residence contracts. Additionally, the software supports online temporary residence registration through public services.",
        "imageUrl": "/feature_home_images/feature-tenant-management.png"
    },
    {
        "title": "Statistical Reporting",
        "description": "You will get a more comprehensive overview of the operation of your boarding houses and rooms, helping you arrange your work more efficiently.",
        "imageUrl": "/feature_home_images/feature-financial-management.png"
    },
    {
        "title": "To-Do Notes",
        "description": "You can note down tasks to do, report incidents occurring at the boarding house... The application automatically reminds you of tasks to be performed.",
        "imageUrl": "/feature_home_images/feature-advertisement.png"
    },
    {
        "title": "Staff Management",
        "description": "The software provides role-based access control features, allowing you to organize your company or teams to participate in management.",
        "imageUrl": "/feature_home_images/feature-deposit-management.png"
    },
    {
        "title": "Broker Management",
        "description": "Provides features for managing brokers, helping you track and record contracts, brokerage fees. This enhances the filling of vacancies.",
        "imageUrl": "/feature_home_images/feature-tenant-management.png"
    },    
];

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto p-8 bg-cover bg-center " style={{ backgroundImage: "url('/image/background.jpg')" }}>
            <h1 className="text-3xl font-bold text-center mb-8">WITH THE EXCELLENT FEATURES, THE MANAGEMENT SOFTWARE WILL SUPPORT YOU.</h1>
            <h2 className="text-xl font-bold text-center mb-8">Many basic and extended features will make managing your boarding house easier than ever. Please consider some basic functions that we are supporting.</h2>
            <div className="relative py-4 pl-12 pr-6 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-md">
                <p className="font-semibold text-lg text-teal-800 text-center" >
                   RoomHub supports you in data entry in cases where there are multiple buildings, rooms, and rental apartments.
                </p>
                <p className="text-sm text-teal-700 mt-2 text-center ">
                   It makes digitization quick and convenient. You can complete your conversion task in just 2 to 3 days.
                </p>
            </div>
            <br />  
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <FeatureCard key={index} title={feature.title} description={feature.description} imageUrl={feature.imageUrl} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;

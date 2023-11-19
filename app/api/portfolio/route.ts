import { NextRequest, NextResponse } from 'next/server';
import { type } from 'os';


//define a portfolio object which has an id, name, description, 

type Portfolio = {
    id: string;
    name: string;
    description: string;
}


//create some mock data for the portfolio object

const portfolios: Portfolio[] = [
    {
        id: '1',
        name: 'Portfolio 1',
        description: 'This is the first portfolio'
    },
    {
        id: '2',
        name: 'Portfolio 2',
        description: 'This is the second portfolio'
    },
    {
        id: '3',
        name: 'Portfolio 3',
        description: 'This is the third portfolio'
    }
] 


// this method will response with an object called Portfolio based on an ID 




export async function GET(request: NextRequest ) {

    const url = new URL(request.nextUrl);

    // Get the id from the request
    const id = url.searchParams.get('id');

    // find the portfolio with the id and return the portfolio object

    const portfolio = portfolios.find((portfolio) => portfolio.id === id);

    return NextResponse.json(portfolio);
    
}
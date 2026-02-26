export type chargeType = "fixed" | "perHour"
export type numBol = 0 | 1

export interface Project {
    id: number
    name: string
    description?: string
    charge_type?: chargeType

    client_name?: string;
    client_email?: string;
    client_company?: string;

    start_date?: string;
    delivery_forecast?: string;

    budget?: number;
    contact_budget?: number;
    initial_pay?: number;
    expected_pay_date?: string;

    project_started: numBol;
    projectCompleted: numBol;
    created_at: string;
}

export interface saveProjectInterface {
    budget: number;
    projectStarted: Exclude<Awaited<boolean | symbol>, symbol>;
    projectCompleted: Exclude<Awaited<boolean | symbol>, symbol>;
    deliveryForecast: string;
    startDate: Exclude<Awaited<string | symbol>, symbol>;
    clientEmail: Exclude<Awaited<string | symbol>, symbol>;
    clientName: Exclude<Awaited<string | symbol>, symbol>;
    contactBudget: number;
    chargeType: Exclude<Awaited<symbol | string>, symbol>;
    description: Exclude<Awaited<string | symbol>, symbol>;
    isInitialPay: number;
    expectedPayDate: string;
    clientCompany: Exclude<Awaited<string | symbol>, symbol>;
    name: Exclude<Awaited<string | symbol>, symbol>
}
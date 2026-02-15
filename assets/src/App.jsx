import React from "react";
import { Button, Typography } from "@douyinfe/semi-ui";

const { Title } = Typography;

export default function App() {
    return (
        <div className="p-6">
            <Title heading={3}>Plugin Starter</Title>

            <div className="mt-4">
                <Button type="primary">
                    Semi UI Button
                </Button>
            </div>
        </div>
    );
}

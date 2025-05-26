import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Make sure this is imported
import React from "react";

interface PageTitleProps {
    title: string;
    showButton?: boolean;
    buttonText?: string;
    onClick?: () => void;
}

const PageTitle = ({ title, showButton = false, buttonText = "React Order", onClick }: PageTitleProps) => {
    return (
        <div className="flex items-center gap-x-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {showButton && (
                <Button
                    variant="contained"
                    className="!bg-[#17c2af] !rounded-full !text-white !font-bold !text-sm !px-6 !py-3 !shadow-none"
                    startIcon={<AddIcon className="!text-white" />}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

export default PageTitle;

import { observer } from "mobx-react-lite";
import { Accordion, AccordionDetails, AccordionSummary, Chip, Icon, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { TRANSLATE_TERMS } from "src/utils";
import { TreeCategory } from "./index";
import { Category } from "src/models";
import { FC, SyntheticEvent, useState } from "react";
import { useStore } from "src/stores";
import { ROOT_CATEGORY } from "src/config";

export const TreeViewSelector: FC<{
    category: Category, dropCategoryHandle: (event: any) => void, set_category: (category: Category) => void, chooseCategoryPlaceholder?: string, withCheckbox?: boolean
}> = observer(({ category, dropCategoryHandle, set_category, chooseCategoryPlaceholder, withCheckbox }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const { sCategories } = useStore();

    const handleChange = (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const selectHandle = (category: Category) => {
        set_category(category);
        setExpanded(false);
    }

    const props = {
        ...(withCheckbox ? { onSelectItem: selectHandle, currentSelect: category } : { onClickLeaf: selectHandle })
    };

    return <Accordion expanded={expanded} onChange={handleChange} sx={{ p: 0, border: "0.5px solid #999" }}>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="choose-category"
            id="choose-category"
            sx={{ border: "0.5px solid #999" }}
        >
            {category._id && category._id != ROOT_CATEGORY ?
                <Chip label={category.name} onDelete={dropCategoryHandle}
                      icon={<Icon
                          className="material-icons-two-tone">{category.icon}</Icon>} /> :
                <Typography>{chooseCategoryPlaceholder ?? TRANSLATE_TERMS.CHOOSE_CATEGORY_PLACEHOLDER}</Typography>}
        </AccordionSummary>
        <AccordionDetails>
            <TreeCategory root={sCategories.treeViewData} isView={true} {...props} />
        </AccordionDetails>
    </Accordion>;
});
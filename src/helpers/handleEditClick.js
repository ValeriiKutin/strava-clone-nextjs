import { useUserDataStore } from "@/store/userData-store";

export const HandleEditCLick = (fieldId) => {
    const { activeFiledId, setActiveFiledId } = useUserDataStore()

    setActiveFiledId((prev) => prev === fieldId ? null : fieldId);
}
"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from './Filters.module.css';

export default function Filters(props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('name', term);
        } else {
            params.delete('name');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleType = (type) => {
        const params = new URLSearchParams(searchParams);
        if (type) {
            params.set('type', type);
        } else {
            params.delete('type');
        }
        replace(`${pathname}?${params.toString()}`);
    }



    const handleLimit = (limit) => {
        const params = new URLSearchParams(searchParams);
        if (limit) {
            params.set('limit', limit);
        } else {
            params.delete('limit');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    return (
        <div className={styles["filter-container"]}>
            <input className={styles["input"]}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                type="text"
                id="search-input"
                placeholder="Enter Pokemon name..."
                defaultValue={searchParams.get('name')?.toString()}
            />
            <select className={styles["type-select"]}
                name="type"
                onChange={(e) => {
                    handleType(e.target.value)
                }}
                defaultValue={searchParams.get('type')?.toString() ?? ""}
            >
                <option value="">all</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="bug">bug</option>
                <option value="poison">poison</option>
                <option value="normal">normal</option>
                <option value="flying">flying</option>
            </select>
            <select className={styles["limit-select"]}
                name="limit"
                onChange={(e) => {
                    handleLimit(e.target.value);
                }}
                defaultValue={searchParams.get('limit')?.toString() ?? 20}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
        </div>
    )
}
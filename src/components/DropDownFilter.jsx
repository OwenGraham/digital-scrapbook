export default function DropDownFilter({ children }) {
    return (
        <select name="timeFilter" id="timeFilter" className="filter-item">
            <option value="past">Past {children}</option>
            <option value="future">Future {children}</option>
            <option value="all">All {children}</option>
        </select>
    )
}
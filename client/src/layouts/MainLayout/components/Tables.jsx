import { useState, useMemo } from 'react';

const Table = ({
	data,
	columns,
	itemsPerPage = 5,
	searchable = true,
	sortable = true,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: 'asc',
	});

	// Handle sorting
	const handleSort = (key) => {
		if (!sortable) return;

		setSortConfig((prevSort) => ({
			key,
			direction:
				prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	// Filter and sort data
	const processedData = useMemo(() => {
		let filtered = [...data];

		// Apply search filter
		if (searchTerm) {
			filtered = filtered.filter((item) =>
				Object.values(item).some((value) =>
					String(value).toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}

		// Apply sorting
		if (sortConfig.key) {
			filtered.sort((a, b) => {
				const aValue = a[sortConfig.key];
				const bValue = b[sortConfig.key];

				if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
				if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return filtered;
	}, [data, searchTerm, sortConfig]);

	// Calculate pagination
	const totalPages = Math.ceil(processedData.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = processedData.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// Pagination controls
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className='w-full'>
			{/* Search Bar */}
			{searchable && (
				<div className='mb-4'>
					<input
						type='text'
						placeholder='Search...'
						className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			{/* Table */}
			<div className='overflow-x-auto rounded-lg border border-gray-200'>
				<table className='min-w-full divide-y divide-gray-200'>
					{/* Header */}
					<thead className='bg-gray-50'>
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									onClick={() => handleSort(column.key)}
									className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  `}>
									<div className='flex items-center space-x-1'>
										<span>{column.label}</span>
										{sortable && sortConfig.key === column.key && (
											<span className='ml-1'>
												{sortConfig.direction === 'asc' ? '↑' : '↓'}
											</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>

					{/* Body */}
					<tbody className='bg-white divide-y divide-gray-200'>
						{paginatedData.map((row, rowIndex) => (
							<tr key={rowIndex} className='hover:bg-gray-50 transition-colors'>
								{columns.map((column) => (
									<td
										key={column.key}
										className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{column.render
											? column.render(row[column.key], row)
											: row[column.key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className='flex items-center justify-between mt-4 text-sm'>
					<div className='text-gray-600'>
						Showing {startIndex + 1} to{' '}
						{Math.min(startIndex + itemsPerPage, processedData.length)} of{' '}
						{processedData.length} entries
					</div>
					<div className='flex space-x-2'>
						{[...Array(totalPages)].map((_, index) => (
							<button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								className={`
                  px-3 py-1 rounded-md
                  ${
										currentPage === index + 1
											? 'bg-blue-500 text-white'
											: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
									}
                `}>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Table;

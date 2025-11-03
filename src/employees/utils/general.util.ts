export function getEmployeeRates(income_type: string, salary: number) {
    let basic_salary = 0
    let daily_rate = 0
    let hourly_rate = 0
    let minute_rate = 0

    if (income_type === 'Monthly') {
        basic_salary = salary/2
        daily_rate = salary / 26
        hourly_rate = daily_rate / 8
        minute_rate = hourly_rate / 60
    } else {
        basic_salary = salary
        daily_rate =  salary
        hourly_rate = daily_rate / 8
        minute_rate = hourly_rate / 60
    }
  return { basic_salary, daily_rate, hourly_rate, minute_rate };
}

export function getFullName(
  first_name: string,
  last_name: string,
  middle_name?: string,
) {
  const middileInitial = middle_name
    ? `${middle_name.charAt(0).toUpperCase()}.`
    : '';
  return `${last_name}, ${first_name} ${middileInitial}`;
  // ex. Dela Cruz, Juan M.
  // ex. Dela Cruz, Juan
}

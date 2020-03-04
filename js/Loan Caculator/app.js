// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display='none'; 
    
    // Show loader
    document.getElementById('loading').style.display='block';

    setTimeout(caculateResults, 2000);

    e.preventDefault();
});

// Caculate Results
function caculateResults(e){
    console.log('Caculating...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const caculatedInterest = parseFloat(interest.value) / 100 / 12;
    const caculatedPayments = parseFloat(years.value) * 12;
    
    // Compute Monthly payment
    const x = math.pow(1 + calculatedInterest, caculatedPayments);
    const monthly = (principal*x*caculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * caculatedPayments).toFixed(2);
        totalInterest.value = (monthly * caculatedPayments)-principal.toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();
}

// Show Error
function showError(error) {
    // Show results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000); 
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}
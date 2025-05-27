document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetInput = document.getElementById('totalBudget');
    const sliders = document.querySelectorAll('.slider');
    const totalAllocatedSpan = document.getElementById('totalAllocated');
    const remainingSpan = document.getElementById('remaining');
    const warningDiv = document.getElementById('warning');


    const ctx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Savings'],
            datasets: [{
                data: [1500, 750, 500, 250, 1500],
                backgroundColor: [
                    '#FFA725', 
                    '#7E5CAD', 
                    '#72BAA9', 
                    '#D5E7B5', 
                    '#205781' 
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    function updateBudget() {
        const totalBudget = parseFloat(totalBudgetInput.value) || 0;
        let totalAllocated = 0;
        const allocations = {};

        sliders.forEach(slider => {
            const percentage = parseFloat(slider.value);
            const category = slider.parentElement.dataset.category;
            const amount = (totalBudget * percentage) / 100;

            slider.parentElement.querySelector('.percentage span').textContent = percentage;
            slider.parentElement.querySelector('.value').textContent = Math.round(amount);
            totalAllocated += amount;
            allocations[category] = amount;
        });

        totalAllocatedSpan.textContent = Math.round(totalAllocated);
        remainingSpan.textContent = Math.round(totalBudget - totalAllocated);


        budgetChart.data.datasets[0].data = [
            allocations.housing,
            allocations.food,
            allocations.transport,
            allocations.entertainment,
            allocations.savings
        ];
        budgetChart.update();


        if (totalAllocated > totalBudget) {
            warningDiv.classList.remove('hidden');
        } else {
            warningDiv.classList.add('hidden');
        }
    }


    totalBudgetInput.addEventListener('input', updateBudget);
    sliders.forEach(slider => {
        slider.addEventListener('input', updateBudget);
    });


    updateBudget();
});
// 初始化数据
if (!localStorage.getItem('badCompanies')) {
    localStorage.setItem('badCompanies', JSON.stringify([]));
}

// 获取DOM元素
const searchBtn = document.getElementById('search-btn');
const companyNameInput = document.getElementById('company-name');
const resultsContainer = document.getElementById('results');
const submitForm = document.getElementById('submit-form');

// 搜索功能
searchBtn.addEventListener('click', function() {
    const companyName = companyNameInput.value.trim();
    if (companyName) {
        searchCompanies(companyName);
    } else {
        alert('请输入公司名称');
    }
});

// 按回车键搜索
companyNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// 提交表单功能
submitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const company = document.getElementById('submit-company').value.trim();
    const reason = document.getElementById('submit-reason').value.trim();
    const contact = document.getElementById('submit-contact').value.trim();
    
    if (company && reason) {
        submitCompany(company, reason, contact);
        // 清空表单
        submitForm.reset();
        alert('提交成功！感谢您的贡献');
    } else {
        alert('请填写公司名称和避雷原因');
    }
});

// 搜索公司函数
function searchCompanies(keyword) {
    const companies = JSON.parse(localStorage.getItem('badCompanies'));
    const filteredCompanies = companies.filter(company => 
        company.name.toLowerCase().includes(keyword.toLowerCase())
    );
    
    displayResults(filteredCompanies);
}

// 提交公司函数
function submitCompany(name, reason, contact) {
    const companies = JSON.parse(localStorage.getItem('badCompanies'));
    const newCompany = {
        id: Date.now(),
        name: name,
        reason: reason,
        contact: contact,
        date: new Date().toISOString()
    };
    
    companies.push(newCompany);
    localStorage.setItem('badCompanies', JSON.stringify(companies));
}

// 显示结果函数
function displayResults(companies) {
    if (companies.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #666;">未找到相关公司信息</p>';
        return;
    }
    
    let html = '';
    companies.forEach(company => {
        html += `
            <div class="result-item">
                <h3>${company.name}</h3>
                <p><strong>避雷原因：</strong>${company.reason}</p>
                ${company.contact ? `<p class="contact"><strong>联系方式：</strong>${company.contact}</p>` : ''}
                <p class="contact"><strong>提交时间：</strong>${new Date(company.date).toLocaleString()}</p>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// 初始化显示所有公司
function initDisplay() {
    const companies = JSON.parse(localStorage.getItem('badCompanies'));
    if (companies.length > 0) {
        displayResults(companies);
    } else {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #666;">暂无公司信息，欢迎提交</p>';
    }
}

// 页面加载时初始化
initDisplay();
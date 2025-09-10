(function () {
    const rightPanel = document.getElementById('rightPanel');
    const menuContainer = rightPanel.querySelector('.menu-icons');
    const themeToggle = document.getElementById('themeToggle');
    const panelTitle = document.getElementById('panelTitle');
    const toggleBtn = document.getElementById('toggleBtn');

    let currentPanelType = "columns"; 

    //  Dashboard menu
    const defaultMenu = [
        {
            section: "Dashboard Types",
            items: [
                { icon: "fas fa-eye", label: "View" },
                { icon: "fas fa-clipboard", label: "Executive Summary" }
            ]
        },
        {
            section: "Operations Dashboard",
            items: [
                {
                    icon: "fas fa-project-diagram",
                    label: "Project Timeline",
                    children: ["Phase 1", "Phase 2", "Milestones"]
                },
                {
                    icon: "fas fa-users-cog",
                    label: "Resource Allocation",
                    children: ["Team A", "Team B", "Contractors"]
                }
            ]
        },
        {
            section: "Financial Dashboard",
            items: [
                {
                    icon: "fas fa-dollar-sign",
                    label: "Revenue Analysis",
                    children: ["Monthly Trends", "Quarterly Growth"]
                },
                {
                    icon: "fas fa-chart-pie",
                    label: "Expense Breakdown",
                    children: ["Salaries", "Infrastructure", "Marketing"]
                },
                {
                    icon: "fas fa-file-alt",
                    label: "Weekly Reports",
                    children: ["Team Updates", "Progress Notes"]
                }
            ]
        },
    ];

    // other panels
    const panels = {
        columns: defaultMenu, //  Dashboard menu as default
        //Tasks menu
        checklist: [
            {
                section: "Quick Actions",
                items: [
                    { icon: "fas fa-plus", label: "New Task" },
                    { icon: "fas fa-filter", label: "Filter Tasks" }
                ]
            },
            {
                section: "My Tasks",
                items: [
                    {
                        icon: "fas fa-calendar-day",
                        label: "Due Today",
                        children: ["Review design", "Updated doc", "Test new features"]
                    },
                    {
                        icon: "fas fa-spinner",
                        label: "In Progress",
                        children: ["Implement user auth", "Database migration"]
                    },
                    {
                        icon: "fas fa-check-circle",
                        label: "Completed",
                        children: ["Initial setup", "API integration"]
                    }
                ]
            },
            {
                section: "Other",
                items: [
                    {
                        icon: "fas fa-flag",
                        label: "Priority Tasks",
                        children: ["Client feedback fixes", "Prepare presentation"]
                    }
                ]
            }
        ],
        //profile menu
        profile: [
            { icon: 'fas fa-user', label: 'Account' },
            { icon: 'fas fa-cog', label: 'Settings' },
            { icon: 'fas fa-sign-out-alt', label: 'Logout' }
        ]
    };

    // Restore state
    const storedExpanded = localStorage.getItem('panel-expanded') === 'true';
    if (storedExpanded) rightPanel.classList.add('expanded');
    updateToggleUI();

    // Load menu based on expansion state
    loadMenu(panels[currentPanelType] || defaultMenu);

    // Toggle expand/collapse 
    toggleBtn.addEventListener('click', () => {
        rightPanel.classList.toggle('expanded');
        localStorage.setItem('panel-expanded', rightPanel.classList.contains('expanded'));
        updateToggleUI();
        loadMenu(panels[currentPanelType] || defaultMenu);
    });

    function updateToggleUI() {
        if (rightPanel.classList.contains('expanded')) {
            toggleBtn.classList.replace('fa-chevron-right', 'fa-chevron-left');
            panelTitle.style.display = 'block';
        } else {
            toggleBtn.classList.replace('fa-chevron-left', 'fa-chevron-right');
            panelTitle.style.display = 'none';
        }
    }

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const next = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(next);
    });

    function setTheme(theme) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        localStorage.setItem('site-theme', theme);
        if (theme === 'dark') {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Sidebar panel name
    document.querySelectorAll('.left-bar i[data-panel]').forEach(icon => {
        icon.addEventListener('click', () => {
            currentPanelType = icon.dataset.panel;
            const items = panels[currentPanelType] || defaultMenu;

            const panelName =
                currentPanelType === 'columns' ? 'Dashboard' :
                currentPanelType === 'checklist' ? 'Tasks' :
                currentPanelType === 'profile' ? 'Profile' : 'Menu';

            panelTitle.textContent = panelName;
            loadMenu(items);
        });
    });

    // Load menu depending on expanded/collapsed state
    function loadMenu(items) {
        // Clear old items except title + search
        Array.from(menuContainer.children).forEach(child => {
            if (!child.classList.contains("panel-title") &&
                !child.classList.contains("search")) {
                menuContainer.removeChild(child);
            }
        });

        const expanded = rightPanel.classList.contains("expanded");

        if (items.length && items[0].section) {
            // Section-based menu
            items.forEach(section => {
                if (expanded) {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.className = "menu-section";
                    sectionDiv.textContent = section.section;
                    menuContainer.appendChild(sectionDiv);
                }

                section.items.forEach(item => {
                    const div = document.createElement("div");
                    div.className = "menu-item" + (item.children ? " has-children" : "");
                    div.innerHTML = `
                        <i class="${item.icon}"></i>
                        ${expanded ? `
                            <span>${item.label}</span>
                            ${item.children ? '<i class="fas fa-chevron-down child-toggle"></i>' : ""}` : ""}
                    `;
                    menuContainer.appendChild(div);

                    if (item.children && expanded) {
                        const childList = document.createElement("div");
                        childList.className = "child-list";
                        item.children.forEach(child => {
                            const childDiv = document.createElement("div");
                            childDiv.className = "menu-item child";
                            childDiv.innerHTML = `<span>${child}</span>`;
                            childList.appendChild(childDiv);
                        });
                        menuContainer.appendChild(childList);

                        // Toggle expand/collapse of child items
                        div.querySelector(".child-toggle").addEventListener("click", (e) => {
                            e.stopPropagation();
                            childList.classList.toggle("open");
                            div.classList.toggle("open");
                        });
                    }
                });
            });
        } else {
            // Flat menu
            items.forEach(item => {
                const div = document.createElement("div");
                div.className = "menu-item";
                div.innerHTML = `
                    <i class="${item.icon}"></i>
                    ${expanded ? `<span>${item.label}</span>` : ""}
                `;
                menuContainer.appendChild(div);
            });
        }
    }
})();

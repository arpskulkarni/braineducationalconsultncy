class Client {
    constructor(profileDetails, assignedConsultant, activeProjects) {
        this.profileDetails = profileDetails;
        this.assignedConsultant = assignedConsultant;
        this.activeProjects = activeProjects;
    }

    getProfileDetails() {
        return this.profileDetails;
    }

    getAssignedConsultant() {
        return this.assignedConsultant;
    }

    getActiveProjects() {
        return this.activeProjects;
    }

    setProfileDetails(newDetails) {
        this.profileDetails = newDetails;
    }

    setAssignedConsultant(consultant) {
        this.assignedConsultant = consultant;
    }

    setActiveProjects(projects) {
        this.activeProjects = projects;
    }
}

module.exports = Client;
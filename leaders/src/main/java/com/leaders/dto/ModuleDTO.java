package com.leaders.dto;

public class ModuleDTO {
	
	private int moduleNum;
	private String model;
	private String version;
	private String installDate;
	private String expirationDate;
	private String status;
	
	public int getModuleNum() {
		return moduleNum;
	}
	public void setModuleNum(int moduleNum) {
		this.moduleNum = moduleNum;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getInstallDate() {
		return installDate;
	}
	public void setInstallDate(String installDate) {
		this.installDate = installDate;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {

		return "" + moduleNum + " , " + model + " , " + version + " , " + installDate + " , " + expirationDate + " , " + status;
	}

}

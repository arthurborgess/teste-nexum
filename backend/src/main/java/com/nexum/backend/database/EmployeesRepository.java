package com.nexum.backend.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexum.backend.entities.Employees;

public interface EmployeesRepository extends JpaRepository<Employees, Long> {}